import Image from "next/image"; 
import BannerSection from "./components/home/Bannersection";
import CategorySection from "./components/home/Categorysection";
import NewArrivals from "./components/home/NewArrivals";
// import Lettersection from "./components/homesection/Lettersection";



export default function Home() {
  return (
    
    <div>
      <BannerSection/>
      <CategorySection/>
      <NewArrivals/>
      {/* <Lettersection/> */}
    </div>
  );
}
