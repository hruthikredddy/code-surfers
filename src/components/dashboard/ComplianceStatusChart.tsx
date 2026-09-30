import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { CheckCircle2, Clock, AlertTriangle, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { getComplianceMetrics } from '../../services/dashboardDataService.ts';

export function ComplianceStatusChart() {
  const { t } = useLanguage();
  const metrics = getComplianceMetrics();
  const [chartMode, setChartMode] = useState<'donut' | 'bars'>('donut');

  const chartData = [
    {
      name: t('dashboard.passed', 'PASSED'),
      value: metrics.passed,
      color: '#AAA785', // muted olive
      badgeColor: 'bg-[#AAA785]'
    },
    {
      name: t('dashboard.pending', 'PENDING'),
      value: metrics.pending,
      color: '#E1E1D5', // soft sage
      badgeColor: 'bg-[#E1E1D5]'
    },
    {
      name: t('dashboard.failed', 'FAILED / ACTION'),
      value: metrics.failed,
      color: '#FF6B6B', // status error
      badgeColor: 'bg-[#FF6B6B]'
    }
  ];

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Chart Header */}
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] pb-3 mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
            {t('dashboard.complianceStatusTitle', 'Compliance & Testing Status')}
          </h3>
          <p className="text-xs text-[#E1E1D5] leading-normal mt-0.5">
            {t('dashboard.complianceStatusSubtitle', 'Analyzed requirements across active certifications & test reports')}
          </p>
        </div>

        {/* View toggle button */}
        <div className="flex items-center gap-1 rounded-lg bg-[#2A3328] p-0.5 border border-[rgba(170,167,133,0.20)]">
          <button
            type="button"
            onClick={() => setChartMode('donut')}
            className={`p-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              chartMode === 'donut'
                ? 'bg-[#232323] text-[#AAA785] shadow-2xs font-semibold'
                : 'text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
            title={t('dashboard.donutView', 'Donut Chart')}
            aria-label={t('dashboard.donutView', 'Donut Chart')}
          >
            <PieIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setChartMode('bars')}
            className={`p-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              chartMode === 'bars'
                ? 'bg-[#232323] text-[#AAA785] shadow-2xs font-semibold'
                : 'text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
            title={t('dashboard.barView', 'Category Breakdown')}
            aria-label={t('dashboard.barView', 'Category Breakdown')}
          >
            <BarChart2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative w-full h-56 flex items-center justify-center">
        {chartMode === 'donut' ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0];
                    const percent = Math.round(((data.value as number) / metrics.total) * 100);
                    return (
                      <div className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-2.5 shadow-md text-xs">
                        <p className="font-bold text-[#FDFDF5]">{data.name}</p>
                        <p className="text-[#E1E1D5] mt-0.5">
                          <span className="font-semibold text-[#FDFDF5]">{data.value} items</span> ({percent}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={metrics.categoryBreakdown}
              margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(170,167,133,0.15)" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 10, fill: '#AAA785' }}
                interval={0}
                angle={-12}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 10, fill: '#AAA785' }} allowDecimals={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-2.5 shadow-md text-xs">
                        <p className="font-bold text-[#FDFDF5] mb-1">{label}</p>
                        <div className="space-y-0.5">
                          <p className="text-[#E1E1D5] font-medium">Passed: {payload[0]?.value}</p>
                          <p className="text-[#AAA785] font-medium">Pending: {payload[1]?.value}</p>
                          <p className="text-[#FF6B6B] font-medium">Failed: {payload[2]?.value}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="passed" name="Passed" fill="#AAA785" radius={[3, 3, 0, 0]} stackId="a" />
              <Bar dataKey="pending" name="Pending" fill="#E1E1D5" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="failed" name="Failed" fill="#FF6B6B" radius={[3, 3, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Center label for donut mode */}
        {chartMode === 'donut' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-[#FDFDF5] leading-none">
              {metrics.compliancePercentage}%
            </span>
            <span className="text-[11px] text-[#AAA785] font-semibold leading-normal mt-0.5">
              {t('dashboard.compliant', 'Compliant')}
            </span>
          </div>
        )}
      </div>

      {/* Legend & Stats Grid */}
      <div className="mt-4 pt-3 border-t border-[rgba(170,167,133,0.20)] grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#232323] border border-[#AAA785]/25">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#AAA785]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />
            <span>{t('dashboard.passed', 'Passed')}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-base font-bold text-[#FDFDF5]">{metrics.passed}</span>
            <span className="text-[10px] text-[#AAA785] font-medium">
              ({Math.round((metrics.passed / metrics.total) * 100)}%)
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#232323] border border-amber-500/25">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>{t('dashboard.pending', 'Pending')}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-base font-bold text-[#FDFDF5]">{metrics.pending}</span>
            <span className="text-[10px] text-amber-400 font-medium">
              ({Math.round((metrics.pending / metrics.total) * 100)}%)
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#232323] border border-rose-500/25">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            <span>{t('dashboard.failed', 'Action Req')}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-base font-bold text-[#FDFDF5]">{metrics.failed}</span>
            <span className="text-[10px] text-rose-400 font-medium">
              ({Math.round((metrics.failed / metrics.total) * 100)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
