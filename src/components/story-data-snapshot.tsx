import type { ReactNode } from "react";
import type { StoryDataSnapshot } from "@/lib/story";

function TableCard({ children, minWidth }: { children: ReactNode; minWidth: number }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table
        className="w-full border-collapse text-left font-mono text-[13px]"
        style={{ minWidth }}
      >
        {children}
      </table>
    </div>
  );
}

function Th({ children }: { children: ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function Td({ children, muted = true }: { children: ReactNode; muted?: boolean }) {
  return (
    <td className={`px-4 py-2.5 ${muted ? "text-muted" : "text-foreground"}`}>{children}</td>
  );
}

function DeltaCell({ delta }: { delta: string }) {
  if (delta.startsWith("~")) {
    return <span className="text-muted">{delta}</span>;
  }
  return <span className="font-medium text-accent">{delta}</span>;
}

export function StoryDataSnapshotBlock({ data }: { data: StoryDataSnapshot }) {
  return (
    <div className="my-10 flex max-w-3xl flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{data.heading}</h2>
        {data.intro ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{data.intro}</p>
        ) : null}
      </div>

      <div>
        <div className="mb-2 text-xs font-medium tracking-[0.12em] text-muted uppercase">
          Schema comparison
        </div>
        <TableCard minWidth={560}>
          <thead>
            <tr className="border-b border-border text-xs tracking-wide text-accent uppercase">
              <Th>Field</Th>
              <Th>QuickFlips (premiumlistallsystems.csv)</Th>
              <Th>CATRP (catrp_buylist_091126.csv)</Th>
            </tr>
          </thead>
          <tbody>
            {data.schemaComparison.map((row) => (
              <tr key={row.field} className="border-b border-border/60 last:border-0">
                <Td muted={false}>{row.field}</Td>
                <Td>{row.quickFlips}</Td>
                <Td>{row.catrp}</Td>
              </tr>
            ))}
          </tbody>
        </TableCard>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium tracking-[0.12em] text-muted uppercase">
          Catalogue stats
        </div>
        <TableCard minWidth={480}>
          <thead>
            <tr className="border-b border-border text-xs tracking-wide text-accent uppercase">
              <Th>Source</Th>
              <Th>SKUs</Th>
              <Th>Unique platforms/categories</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {data.stats.map((row) => (
              <tr key={row.source} className="border-b border-border/60 last:border-0">
                <Td muted={false}>{row.source}</Td>
                <Td>{row.skus}</Td>
                <Td>{row.categories}</Td>
                <Td>{row.date}</Td>
              </tr>
            ))}
          </tbody>
        </TableCard>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium tracking-[0.12em] text-muted uppercase">
          Price comparison — loose condition, 10 matched items
        </div>
        <TableCard minWidth={620}>
          <thead>
            <tr className="border-b border-border text-xs tracking-wide text-accent uppercase">
              <Th>Item</Th>
              <Th>Platform</Th>
              <Th>QF Loose (USD)</Th>
              <Th>CATRP Loose (USD)</Th>
              <Th>Delta</Th>
            </tr>
          </thead>
          <tbody>
            {data.priceComparison.map((row) => (
              <tr key={row.item} className="border-b border-border/60 last:border-0">
                <Td muted={false}>{row.item}</Td>
                <Td>{row.platform}</Td>
                <Td>{row.qfPrice}</Td>
                <Td>{row.catrpPrice}</Td>
                <td className="px-4 py-2.5">
                  <DeltaCell delta={row.delta} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableCard>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted italic">
          {data.priceNote}
        </p>
      </div>

      <div className="rounded-2xl border border-border border-l-4 border-l-accent bg-card shadow-card py-6 pr-8 pl-6">
        <div className="mb-2 text-xs font-medium tracking-[0.12em] text-muted uppercase">
          Key insight
        </div>
        <p className="text-lg leading-relaxed text-foreground">{data.insight}</p>
      </div>

      <p className="max-w-2xl text-sm leading-relaxed text-muted">{data.coverageGap}</p>
    </div>
  );
}
