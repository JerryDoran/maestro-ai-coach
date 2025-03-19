'use client';

import { DemandLevel, MarketOutlook } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  Brain,
  BriefcaseBusinessIcon,
  LineChart,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type DashboardViewProps = {
  insights: {
    id: string;
    industry: string | null;
    salaryRanges: JsonValue[];
    growthRate: number;
    demandLevel: DemandLevel;
    topSkills: string[];
    marketOutlook: MarketOutlook;
    keyTrends: String[];
    recommendedSkills: String[];
    lastUpdated: Date;
    nextUpdate: Date;
  };
};

export default function DashboardView({ insights }: DashboardViewProps) {
  const salaryData = insights.salaryRanges.map((range: any | null) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  function getDemandLevelColor(level: string) {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  function getMarketOutlookInfo(outlook: string) {
    switch (outlook.toLowerCase()) {
      case 'positive':
        return { icon: TrendingUp, color: 'text-green-500' };
      case 'neutral':
        return { icon: LineChart, color: 'text-yellow-500' };
      case 'low':
        return { icon: TrendingDown, color: 'text-red-500' };
      default:
        return { icon: LineChart, color: 'text-gray-500' };
    }
  }

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdated = format(new Date(insights.lastUpdated), 'MM/dd/yyyy');
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    {
      addSuffix: true,
    }
  );

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <Badge variant='outline'>Last updated: {lastUpdated}</Badge>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Market Outlook */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`size-5 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{insights.marketOutlook}</div>
            <p className='text-muted-foreground text-xs'>
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        {/* Industry Growth */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Industry Growth
            </CardTitle>
            <TrendingUp className='size-5 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className='mt-2' />
          </CardContent>
        </Card>

        {/* Demand Level */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Demand Level</CardTitle>
            <BriefcaseBusinessIcon className={`size-5 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            ></div>
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Top Skills</CardTitle>
            <Brain className='size-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {insights.topSkills.map((skill, index) => (
                <Badge
                  variant='secondary'
                  key={index}
                  className='text-muted-foreground'
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Salary Ranges Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className='bg-background border rounded-lg p-2 shadow-md'>
                          <p className='font-medium text-sm'>{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className='text-sm'>
                              {item.name}: ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }

                    return null;
                  }}
                />

                <Bar dataKey='min' fill='#94a3b8' name='Min Salary (K)' />
                <Bar dataKey='median' fill='#64748b' name='Median Salary (K)' />
                <Bar dataKey='max' fill='#475569' name='Max Salary (K)' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
