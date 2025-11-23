import ProjectDetail from '../../components/projectdetails';

export const metadata = {
  title: 'Burger King - Our Works',
  description: 'Modern fast-food restaurant interior with bold branding, functional layout, and vibrant atmosphere.',
};

export default function BurgerKingPage() {
  return (
    <ProjectDetail
      title="Burger King"
      description="A high-energy fast-food restaurant renovation featuring bold red and black branding, optimized customer flow, durable materials, and vibrant lighting that enhances the brand experience while ensuring operational efficiency."
      hero="https://res.cloudinary.com/duor8d5e3/image/upload/v1763491433/works/title/jpv3sae10gpugz4vqwup.jpg" 
      gallery={[
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763491431/works/gallery/az3fowt3q2m1k0l2eezo.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763491431/works/gallery/yeatofogmiyumosgls4e.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763491432/works/gallery/ft2l83lwsuwwmvuifgfl.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763491431/works/gallery/ytdsbpgr0cjperjwvff6.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763491431/works/gallery/qrzzersmrbiaqojanmuf.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763491433/works/gallery/obwoepdho2173hblsnb1.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763492409/works/gallery/fkrpguwic0x9uijhsc6c.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763492409/works/gallery/zxrqijyxa5za3vdyydbb.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763492409/works/gallery/wz9checugrjqpxdofnig.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763492409/works/gallery/ypliojueadkreqjkrlme.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763492411/works/gallery/xbgbpyxfyt6svzbuxtxy.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763492410/works/gallery/mtqyuihaonauzju6q9ft.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763492410/works/gallery/nlgwul4qyuyofp4mpy9u.jpg",
        "https://res.cloudinary.com/duor8d5e3/image/upload/v1763492411/works/gallery/kgsj8uh2ayzhrugmkgnj.jpg"
      ]}
    />
  );
}