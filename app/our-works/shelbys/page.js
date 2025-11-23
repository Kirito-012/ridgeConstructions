import ProjectDetail from '../../components/projectdetails';

export const metadata = {
  title: 'Shelbys - Our Works',
  description: 'Upscale restaurant featuring modern elegance, warm ambient lighting, and premium interior finishes.',
};

export default function ShelbysPage() {
  return (
    <ProjectDetail
      title="Shelbys"
      description="An upscale dining destination featuring contemporary design, rich textures, custom millwork, and sophisticated lighting that creates an unforgettable guest experience."
      hero="https://res.cloudinary.com/duor8d5e3/image/upload/v1763624657/works/title/nv1vmfnuzwocwsa0xtxg.jpg"
      gallery={[
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624657/works/gallery/mvyobo4ymezcz1q8enhj.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624657/works/gallery/oavfyo5lcsixc5iwf8km.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624656/works/gallery/lkpsx72leznkppdjbppj.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624657/works/gallery/wzbsrszmxccgge05lvd2.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624656/works/gallery/wkmx5ivnvgjia0rytqsy.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624656/works/gallery/xdfsuwgtfr3rxmhawtp1.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624657/works/gallery/v129kmofkeafliudtdzj.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624656/works/gallery/peeafvsodsp30yd8wrtx.jpg"
      ]}
    />
  );
}