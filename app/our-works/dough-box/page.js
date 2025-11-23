import ProjectDetail from '../../components/projectdetails';

export const metadata = {
  title: 'Dough Box - Our Works',
  description: 'A fast-food style restaurant built with a modern, high-traffic layout, durable materials, and efficient kitchen workflows.',
};

export default function DoughBoxPage() {
  return (
    <ProjectDetail
      title="Dough Box"
      description="A fast-food style restaurant built with a modern, high-traffic layout, durable materials, and efficient kitchen workflows. Designed for quick service, smooth customer movement, and a clean, branded dining experience."
      hero="https://res.cloudinary.com/duor8d5e3/image/upload/v1763493501/works/title/jkqhentb42rhbmbk1cro.jpg"
      gallery={[
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493499/works/gallery/ole39glbay8hejgu3cj8.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493499/works/gallery/i6pzmuf9txbhgad9ueng.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493500/works/gallery/rpsy0tval3btsh2a0ha6.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493500/works/gallery/pkmjxdpm3arxnxc3ibba.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493499/works/gallery/zkuh0jzvsyalx6gw4cwu.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493502/works/gallery/p3tc3dse7wvhqqi9s3dm.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493503/works/gallery/qglityaxsn07gok5zrfh.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493502/works/gallery/y5tkm68gkrteqiosmybn.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493503/works/gallery/zwox7vkcj7ce0iu5x0f6.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493504/works/gallery/ihr85knao3u1bd8apwbe.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493505/works/gallery/b4txfp8gifat5hrgyjov.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493504/works/gallery/dvx73m0xk8a7ydcjf1cp.jpg"
      ]}
    />
  );
}