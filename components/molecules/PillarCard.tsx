import Link from "next/link";

interface PillarCardProps {
  icon: string;
  name: string;
  description: string;
  verse?: string;
  href: string;
}

export function PillarCard({ icon, name, description, verse, href }: PillarCardProps) {
  return (
    <div className="pillar-card">
      <span className="pillar-icon">{icon}</span>
      <div className="pillar-name">{name}</div>
      <p className="pillar-desc">{description}</p>
      {verse && <div className="pillar-verse">{verse}</div>}
      <Link href={href} className="pillar-cta">Explore →</Link>
    </div>
  );
}
