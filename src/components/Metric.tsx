interface MetricProps {
  children: React.ReactNode
}

export function Metric({ children }: MetricProps) {
  return <span className="metric">{children}</span>
}

export default Metric
