import ProjectDetail from '../../components/projectdetails';

export const metadata = {
  title: 'Mabelle Dental - Our Works',
  description: 'Premium dental clinic featuring modern design, patient comfort, and state-of-the-art healthcare interiors.',
};

export default function MabelleDentalPage() {
  return (
    <ProjectDetail
      title="Mabelle Dental"
      description="A luxurious dental clinic designed to provide a serene and professional environment. Featuring soft ambient lighting, premium materials, ergonomic layouts, and a calming color palette that enhances patient comfort and trust."
      hero="https://res.cloudinary.com/duor8d5e3/image/upload/v1763622599/works/title/ys6dc8hlj68y1c7e1wsz.jpg"
      gallery={[
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622598/works/gallery/k5tecxussna20o54kbwd.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622599/works/gallery/drlcvydjhotvweti8o4i.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622597/works/gallery/nvmhgsmozf4bfuqe0vnm.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622599/works/gallery/exjp4u0vrefiyqnf6bfn.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622597/works/gallery/g1ryyn2ow10bbxbhsrwb.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622600/works/gallery/pxadc9krerkvfej6k7t4.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622601/works/gallery/dvhl0p4mxozienhokej0.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622602/works/gallery/ujdjjfgioeqoybtfdcfo.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622602/works/gallery/rqq3sj5cqwro6xwbmbhi.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622603/works/gallery/ssk8qh8thjih2iht4bmv.jpg"
      ]}
    />
  );
}