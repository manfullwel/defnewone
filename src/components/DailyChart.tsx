import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyChartProps {
  data: {
    name: string;
    resolved: number;
    pending: number;
  }[];
}

export const DailyChart = ({ data }: DailyChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Visão Geral</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="resolved" fill="#1a365d" name="Resolvidos" />
            <Bar dataKey="pending" fill="#60a5fa" name="Pendentes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
