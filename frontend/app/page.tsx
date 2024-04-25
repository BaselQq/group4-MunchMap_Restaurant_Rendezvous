import Image from "next/image";
import NavBar from "@/components/NavBar";
import RestaurantCard from "@/components/RestaurantCard";
import SideBar from "@/components/SideBar";
import RestaurantGallery from "@/components/RestaurantGallery";
import Footer from "@/components/Footer"

export default function Home() {
  return (
      <main>
          <NavBar/>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
              <SideBar />
              <RestaurantGallery />
          </div>
      </main>
  );
}
