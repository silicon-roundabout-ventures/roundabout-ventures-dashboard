import React from 'react';
import ChartComponent from '@/components/widgets/ChartComponent';

type ChartData = { name: string; value: number }[];

interface ChartsSectionProps {
  industryData: ChartData;
  stageData: ChartData;
  techData: ChartData;
  hqData: ChartData;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  industryData,
  stageData,
  techData,
  hqData,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    <ChartComponent title="Investment by Industry" data={industryData} />
    <ChartComponent
      title="Investment by Stage"
      data={stageData}
      colors={["#00A0A0", "#1A85B9", "#0F4C81"]}
    />
    <ChartComponent
      title="Technology Type Distribution"
      data={techData}
      chartType="pie"
    />
    <ChartComponent
      title="Headquarter Location"
      data={hqData}
      chartType="bar"
    />
  </div>
);

export default ChartsSection;
