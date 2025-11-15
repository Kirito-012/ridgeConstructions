import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getWorksCollection } from "@/lib/db";
import {
  SESSION_COOKIE_NAME,
  validateSessionToken,
} from "@/lib/auth";

function formatWork(document) {
  if (!document) return null;
  const { _id, ...rest } = document;
  return {
    id: _id?.toString() ?? null,
    ...rest,
  };
}

async function ensureAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return validateSessionToken(token);
}

function parseObjectId(id) {
  try {
    return new ObjectId(id);
  } catch (error) {
    return null;
  }
}

export async function PUT(request, context) {
  const { id } = await context.params;
  if (!(await ensureAuthenticated())) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const objectId = parseObjectId(id);
  if (!objectId) {
    return NextResponse.json({ error: "Invalid work id" }, { status: 400 });
  }

  try {
    const payload = await request.json();
    const update = {};

    if (typeof payload?.name === "string" && payload.name.trim()) {
      update.name = payload.name.trim();
    }
    if (typeof payload?.description === "string" && payload.description.trim()) {
      update.description = payload.description.trim();
    }
    if (typeof payload?.titleImageUrl === "string" && payload.titleImageUrl.trim()) {
      update.titleImageUrl = payload.titleImageUrl.trim();
    }
    if (Array.isArray(payload?.galleryImageUrls)) {
      update.galleryImageUrls = payload.galleryImageUrls.filter(Boolean);
    }

    if (!Object.keys(update).length) {
      return NextResponse.json(
        { error: "No valid fields provided" },
        { status: 400 }
      );
    }

    update.updatedAt = new Date();

    const worksCollection = await getWorksCollection();
    const result = await worksCollection.updateOne(
      { _id: objectId },
      { $set: update }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }

    const updated = await worksCollection.findOne({ _id: objectId });
    return NextResponse.json({ work: formatWork(updated) });
  } catch (error) {
    console.error("PUT /api/works/[id] failed", error);
    return NextResponse.json(
      { error: "Failed to update work" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  const { id } = await context.params;
  if (!(await ensureAuthenticated())) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const objectId = parseObjectId(id);
  if (!objectId) {
    return NextResponse.json({ error: "Invalid work id" }, { status: 400 });
  }

  try {
    const worksCollection = await getWorksCollection();
    const result = await worksCollection.deleteOne({ _id: objectId });

    if (!result.deletedCount) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/works/[id] failed", error);
    return NextResponse.json(
      { error: "Failed to delete work" },
      { status: 500 }
    );
  }
}
