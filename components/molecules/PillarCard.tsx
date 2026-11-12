import Link from "next/link";

interface PillarCardProps {
  name: string;
  description: string;
  verse?: string;
  href?: string;
}

export function PillarCard({ name, description, verse, href }: PillarCardProps) {
  return (
    <div className="pillar-card">
      <div className="pillar-name">{name}</div>
      <p className="pillar-desc">{description}</p>
      {verse && <div className="pillar-verse">{verse}</div>}
      {href && <Link href={href} className="pillar-cta">Explore</Link>}
    </div>
  );
}
