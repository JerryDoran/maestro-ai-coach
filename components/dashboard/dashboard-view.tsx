'use client';

import { DemandLevel, MarketOutlook } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

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
  return <div>DashboardView</div>;
}
