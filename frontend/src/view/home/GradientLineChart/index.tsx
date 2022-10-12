import {
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';

// react-chartjs-2 components
import { Line } from 'react-chartjs-2';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS Helper Functions
import gradientChartLine from 'src/mui/assets/theme/functions/gradientChartLine';

// GradientLineChart configurations
import configs from 'src/view/home/GradientLineChart/configs';

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';

// Declaring props types for GradientLineChart
interface Props {
  height?: string | number;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      color: string;
      data: number[];
      fill: boolean;
      borderStyle: string;
    }[];
  };
  [key: string]: any;
}

function GradientLineChart({
  height,
  chart,
}: Props): JSX.Element {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options }: any = chartData;

  useEffect(() => {
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
          ...dataset,
          tension: 0,
          pointRadius: 3,
          pointBorderWidth: 6,
          pointHoverRadius: 3,
          pointHoverBorderWidth: 6,
          borderWidth: 2,
          borderStyle: 'dotted',
          borderColor: colors[dataset.color]
            ? colors[dataset.color || 'dark'].main
            : colors.dark.main,
          fill: dataset.fill,
          maxBarThickness: 6,
          backgroundColor: gradientChartLine(
            chartRef.current.children[0],
            colors[dataset.color]
              ? colors[dataset.color || 'dark'].main
              : colors.dark.main,
          ),
        }))
      : [];

    setChartData(
      configs(chart.labels || [], chartDatasets),
    );
  }, [chart]);

  const renderChart = (
    <MDBox>
      {useMemo(
        () => (
          <MDBox ref={chartRef} sx={{ height }}>
            <Line data={data} options={options} />
          </MDBox>
        ),
        [chartData, height],
      )}
    </MDBox>
  );

  return renderChart;
}

// Declaring default props for GradientLineChart
GradientLineChart.defaultProps = {
  height: '19.125rem',
};

export default GradientLineChart;
