import Navbar from '@/components/navbar/navbar.jsx'
import Footer from '@/components/footer/footer.jsx';
export default function HomeLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
