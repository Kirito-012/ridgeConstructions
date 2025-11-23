import ProjectDetail from '../../components/projectdetails';

export const metadata = {
  title: 'Greenbook Dentistry - Our Works',
  description: 'Modern dental clinic featuring clean design, calming ambiance, and premium healthcare interiors.',
};

export default function GreenbookDentistryPage() {
  return (
    <ProjectDetail
      title="Greenbook Dentistry"
      description="A contemporary dental clinic designed with patient comfort in mind. Featuring soft color palettes, natural light optimization, premium materials, and a calming environment that reduces anxiety and enhances the overall healthcare experience."
      hero="https://res.cloudinary.com/duor8d5e3/image/upload/v1763622058/works/title/g4waoqwfsfgayqhmdeia.jpg"
      gallery={[
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622059/works/gallery/l8duezhfdf9txn1iev0j.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622050/works/gallery/c4v6h5zzjyghx6rjssgy.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622057/works/gallery/nq41wk1pyaskueyxcljw.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622053/works/gallery/hohgjpxoihy4vqcvhkex.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622057/works/gallery/eyhndg4feid4lq6zqz51.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622056/works/gallery/cuwqhqdsekhifuqeoiar.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622058/works/gallery/bwdqqzt30izzlmieaqv0.jpg"
      ]}
    />
  );
}