import NavBar from "@/components/NavBar";
import SideBar from "@/app/home/_components/SideBar";
import RestaurantGallery from "@/app/home/_components/RestaurantGallery";

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
