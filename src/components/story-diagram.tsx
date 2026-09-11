import type { StoryDiagramId } from "@/lib/story";

const box = "fill-card stroke-border";
const label = "fill-current text-foreground text-[13px] font-medium";
const sublabel = "fill-current text-muted text-[11px]";
const arrow = "stroke-accent";

function Pipeline() {
  return (
    <svg viewBox="0 0 860 220" className="h-auto w-full" role="img" aria-label="Data pipeline: supplier CSV exports and the eBay API both feed a shared database, which powers the dashboard">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
        </marker>
      </defs>

      <rect x="10" y="20" width="170" height="64" rx="14" className={box} strokeWidth="1.5" />
      <text x="95" y="46" textAnchor="middle" className={label}>Supplier CSV exports</text>
      <text x="95" y="64" textAnchor="middle" className={sublabel}>inconsistent formats</text>

      <rect x="10" y="136" width="170" height="64" rx="14" className={box} strokeWidth="1.5" />
      <text x="95" y="162" textAnchor="middle" className={label}>eBay API</text>
      <text x="95" y="180" textAnchor="middle" className={sublabel}>listings · orders · inventory</text>

      <rect x="245" y="78" width="180" height="64" rx="14" className={box} strokeWidth="1.5" />
      <text x="335" y="104" textAnchor="middle" className={label}>Adapter layer</text>
      <text x="335" y="122" textAnchor="middle" className={sublabel}>normalize + map fields</text>

      <rect x="490" y="78" width="170" height="64" rx="14" className={box} strokeWidth="1.5" />
      <text x="575" y="104" textAnchor="middle" className={label}>PostgreSQL</text>
      <text x="575" y="122" textAnchor="middle" className={sublabel}>via Prisma</text>

      <rect x="725" y="78" width="125" height="64" rx="14" className="fill-panel stroke-border" strokeWidth="1.5" />
      <text x="787" y="104" textAnchor="middle" className={label}>Dashboard</text>
      <text x="787" y="122" textAnchor="middle" className={sublabel}>filters · FX · offers</text>

      <path d="M180,52 L245,52 L245,95" fill="none" className={arrow} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <path d="M180,168 L245,168 L245,125" fill="none" className={arrow} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <path d="M425,110 L490,110" fill="none" className={arrow} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <path d="M660,110 L725,110" fill="none" className={arrow} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
    </svg>
  );
}

type FlowStage = { title: string; sub: string | [string, string]; gate?: boolean };

function Flow({
  stages,
  loopLabel,
  ariaLabel,
}: {
  stages: FlowStage[];
  loopLabel?: string;
  ariaLabel: string;
}) {
  const w = 860;
  const stageW = 130;
  const boxH = 76;
  const gap = (w - stageW * stages.length) / (stages.length - 1) + stageW;
  const height = loopLabel ? 200 : 150;
  const midY = 30 + boxH / 2;

  return (
    <svg viewBox={`0 0 860 ${height}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
      <defs>
        <marker id="arrowhead2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
        </marker>
      </defs>
      {stages.map((stage, i) => {
        const x = i * gap;
        const lines = Array.isArray(stage.sub) ? stage.sub : [stage.sub];
        return (
          <g key={stage.title}>
            <rect
              x={x}
              y="30"
              width={stageW}
              height={boxH}
              rx="14"
              className={stage.gate ? "fill-panel stroke-accent" : box}
              strokeWidth="1.5"
            />
            <text x={x + stageW / 2} y="56" textAnchor="middle" className={label}>{stage.title}</text>
            {lines.map((line, j) => (
              <text
                key={j}
                x={x + stageW / 2}
                y={74 + j * 14}
                textAnchor="middle"
                className={sublabel}
              >
                {line}
              </text>
            ))}
            {i < stages.length - 1 ? (
              <path
                d={`M${x + stageW},${midY} L${x + gap},${midY}`}
                fill="none"
                className={arrow}
                strokeWidth="1.5"
                markerEnd="url(#arrowhead2)"
              />
            ) : null}
          </g>
        );
      })}
      {loopLabel ? (
        <>
          <path
            d={`M${(stages.length - 1) * gap + stageW / 2},${30 + boxH} C ${(stages.length - 1) * gap + stageW / 2},${height - 20} 90,${height - 20} 90,${30 + boxH}`}
            fill="none"
            className={arrow}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            markerEnd="url(#arrowhead2)"
          />
          <text x="430" y={height - 12} textAnchor="middle" className={sublabel}>{loopLabel}</text>
        </>
      ) : null}
    </svg>
  );
}

function Funnel() {
  return (
    <Flow
      ariaLabel="Process funnel: source, list, sell, track KPIs, with a feedback loop from tracking back to sourcing"
      loopLabel="buyer feedback loops back into pricing + sourcing decisions"
      stages={[
        { title: "Source", sub: "marketplace finds + full collections" },
        { title: "List", sub: "pricing + inventory tooling" },
        { title: "Sell", sub: "eBay + local + conventions" },
        { title: "Track", sub: "KPIs in Python + Sheets" },
      ]}
    />
  );
}

function ListingPipeline() {
  return (
    <Flow
      ariaLabel="Listing pipeline: photos, identify, condition, price, draft listing, then a human-approval gate before publish"
      stages={[
        { title: "Photos", sub: ["EXIF sort +", "group by spacer"] },
        { title: "Identify", sub: ["box art,", "barcodes (vision)"] },
        { title: "Condition", sub: ["tier +", "description"] },
        { title: "Price", sub: ["PriceCharting,", "converted to CAD"] },
        { title: "Draft", sub: ["Inventory +", "Media API"] },
        { title: "Approve", sub: ["review, then", "publish"], gate: true },
      ]}
    />
  );
}

export function StoryDiagram({ id }: { id: StoryDiagramId }) {
  return (
    <div className="my-10 max-w-3xl rounded-3xl border border-border bg-background p-6">
      {id === "ebay-pipeline" ? <Pipeline /> : id === "ebay-funnel" ? <Funnel /> : <ListingPipeline />}
    </div>
  );
}
