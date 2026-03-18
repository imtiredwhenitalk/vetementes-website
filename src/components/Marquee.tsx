export default function Marquee() {
  const items = [
    'NEW COLLECTION SS26',
    '✦',
    'FREE SHIPPING WORLDWIDE',
    '✦',
    'LUXURY STREETWEAR',
    '✦',
    'VETEMENTES',
    '✦',
    'LIMITED EDITIONS',
    '✦',
    'DESIGNED IN KYIV',
    '✦',
  ]

  return (
    <div className="relative py-6 md:py-8 bg-[var(--color-brand)] overflow-hidden select-none">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-black text-xs font-semibold tracking-[0.3em] uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
