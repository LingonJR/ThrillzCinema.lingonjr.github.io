import { Link } from "wouter";

interface CategoryCardProps {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export default function CategoryCard({ id, name, icon, color }: CategoryCardProps) {
  return (
    <Link href={`/category/${id}`}>
      <div className={`category-card bg-gradient-to-br from-${color}/20 to-${color}/5 hover:from-${color}/30 hover:to-${color}/10 rounded-xl p-5 text-center transition-all cursor-pointer`}>
        <i className={`fas fa-${icon} text-${color} text-2xl mb-2`}></i>
        <h3 className="font-bold">{name}</h3>
      </div>
    </Link>
  );
}
