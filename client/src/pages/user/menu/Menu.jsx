import CategorySection from "@/sections/Category.jsx"
import MenuSection from "@/sections/Menu.jsx"

export default function Menu() {
  return (
      <main className="w-full flex flex-col justify-center items-center">
          <CategorySection />
          <MenuSection />
      </main>
  );
}
