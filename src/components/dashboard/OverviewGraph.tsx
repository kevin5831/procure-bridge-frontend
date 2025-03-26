
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Area, AreaChart } from "recharts";

const data = [
  { date: "Feb 8", requests: 65, previous: 55 },
  { date: "Feb 9", requests: 40, previous: 45 },
  { date: "Feb 10", requests: 55, previous: 52 },
  { date: "Feb 11", requests: 80, previous: 70 },
  { date: "Feb 12", requests: 45, previous: 48 },
  { date: "Feb 13", requests: 70, previous: 65 },
  { date: "Feb 14", requests: 62, previous: 58 },
];

export function OverviewGraph() {
  return (
    <div className="p-6 rounded-xl border shadow-sm bg-white overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-1">Request Trends</h3>
        <p className="text-sm text-muted-foreground">Comparison with previous period</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3F51B5" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3F51B5" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A5B4FC" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#A5B4FC" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f6f6f7" strokeDasharray="5 5" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#8A898C"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#8A898C"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            tickMargin={8}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #f1f0fb',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              padding: '8px 12px',
            }}
            formatter={(value: number, name: string) => {
              const label = name === 'requests' ? 'Current Period' : 'Previous Period';
              return [`${value} requests`, label];
            }}
            labelFormatter={(label) => `Date: ${label}`}
            wrapperStyle={{
              outline: 'none'
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value: string) => {
              return value === 'requests' ? 'Current Period' : 'Previous Period';
            }}
          />
          <Area
            type="monotone"
            dataKey="previous"
            name="previous"
            stroke="#A5B4FC"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSecondary)"
            dot={false}
            activeDot={{
              r: 4,
              fill: "#A5B4FC",
              stroke: "#FFFFFF",
              strokeWidth: 2,
            }}
          />
          <Area
            type="monotone"
            dataKey="requests"
            name="requests"
            stroke="#3F51B5"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorPrimary)"
            dot={{
              r: 0,
            }}
            activeDot={{
              r: 6,
              fill: "#3F51B5",
              stroke: "#FFFFFF",
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
