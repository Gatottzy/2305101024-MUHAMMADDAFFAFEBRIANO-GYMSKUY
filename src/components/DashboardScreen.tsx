import { ArrowRight, Plus } from "lucide-react";
import { exerciseList } from "../data/exercises";
import type { ExerciseRecord } from "../types/exercise";
import { RestTimerCard } from "./RestTimerCard";

interface DashboardScreenProps {
  records: ExerciseRecord[];
  onSelectExercise: (exerciseId: number) => void;
  onOpenLogModal: (exerciseId?: number) => void;
  onViewAllHistory: () => void;
  onViewAllExercises: () => void;
}

export function DashboardScreen({
  records,
  onSelectExercise,
  onOpenLogModal,
  onViewAllHistory,
  onViewAllExercises,
}: DashboardScreenProps) {
  const totalExercises = exerciseList.length;
  const totalSets = records.length;
  const totalVolume = records.reduce(
    (sum, rec) => sum + rec.reps * rec.beban,
    0
  );
  const totalReps = records.reduce((sum, rec) => sum + rec.reps, 0);

  let heaviestRecord: ExerciseRecord | null = null;
  for (const rec of records) {
    if (!heaviestRecord || rec.beban > heaviestRecord.beban) {
      heaviestRecord = rec;
    }
  }
  const heaviestExerciseName = heaviestRecord
    ? exerciseList.find((e) => e.id === heaviestRecord.exerciseId)?.name ?? "-"
    : "Belum ada data";

  // Volume & set breakdown per exercise
  const exerciseStats = exerciseList.map((exercise) => {
    const exRecords = records.filter((r) => r.exerciseId === exercise.id);
    const volume = exRecords.reduce((sum, r) => sum + r.reps * r.beban, 0);
    const sets = exRecords.length;
    const maxWeight =
      exRecords.length > 0 ? Math.max(...exRecords.map((r) => r.beban)) : 0;
    return {
      exercise,
      volume,
      sets,
      maxWeight,
    };
  });

  const maxVolume = Math.max(...exerciseStats.map((s) => s.volume), 1);
  const recentRecords = records.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* 4-Column KPI Summary Strip */}
      <section
        aria-label="Ringkasan latihan"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="rounded-xl bg-white border border-slate-200 p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">
            Jenis Latihan
          </p>
          <p className="font-timer text-2xl sm:text-3xl font-semibold text-slate-900 mt-1.5">
            {totalExercises}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Gerakan panduan tersedia
          </p>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">
            Total Set Tercatat
          </p>
          <p className="font-timer text-2xl sm:text-3xl font-semibold text-slate-900 mt-1.5">
            {totalSets}
          </p>
          <p className="text-xs text-slate-500 mt-1 tabular-nums">
            {totalReps} total repetisi
          </p>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">
            Total Volume Beban
          </p>
          <p className="font-timer text-2xl sm:text-3xl font-semibold text-slate-900 mt-1.5">
            {totalVolume.toLocaleString("id-ID")} <span className="text-base font-normal text-slate-500">kg</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Akumulasi beban × repetisi
          </p>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">
            Beban Terberat
          </p>
          <p className="font-timer text-2xl sm:text-3xl font-semibold text-slate-900 mt-1.5">
            {heaviestRecord ? heaviestRecord.beban : 0}{" "}
            <span className="text-base font-normal text-slate-500">kg</span>
          </p>
          <p className="text-xs text-slate-500 mt-1 truncate">
            {heaviestExerciseName}
          </p>
        </div>
      </section>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Volume Breakdown per Exercise */}
        <section className="lg:col-span-7 rounded-xl bg-white border border-slate-200 p-5">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Volume per Gerakan
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih gerakan untuk melihat panduan dan memulai timer istirahat
              </p>
            </div>
            <button
              type="button"
              onClick={onViewAllExercises}
              className="min-h-[40px] px-3 text-xs font-medium text-[#5B45A6] hover:text-[#4B388E] inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span>Semua latihan</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {exerciseStats.map(({ exercise, volume, sets, maxWeight }) => {
              const barPercent =
                volume > 0 ? Math.max(6, Math.round((volume / maxVolume) * 100)) : 0;

              return (
                <button
                  key={exercise.id}
                  type="button"
                  onClick={() => onSelectExercise(exercise.id)}
                  className="w-full py-3.5 px-2 -mx-2 rounded-lg text-left hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45A6] group"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-[#5B45A6] transition-colors">
                        {exercise.name}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        · {exercise.muscle}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 tabular-nums whitespace-nowrap shrink-0">
                      <span className="font-timer font-medium text-slate-900">
                        {volume.toLocaleString("id-ID")} kg
                      </span>{" "}
                      <span className="text-slate-400">·</span>{" "}
                      <span>{sets} set</span>
                      {maxWeight > 0 && (
                        <>
                          {" "}
                          <span className="text-slate-400">·</span>{" "}
                          <span>maks {maxWeight} kg</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#5B45A6] transition-all duration-300"
                      style={{ width: `${barPercent}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Right: Built-in Rest Timer */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <RestTimerCard />

          <div className="rounded-xl bg-white border border-slate-200 p-5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900">
                Tambah Catatan Set
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simpan repetisi dan beban latihan hari ini
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenLogModal()}
              className="min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45A6]"
            >
              <Plus className="w-4 h-4 text-[#5B45A6]" aria-hidden="true" />
              <span>Catat</span>
            </button>
          </div>
        </section>
      </div>

      {/* Recent Workout Records Table */}
      <section className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Catatan Latihan Terbaru
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              5 sesi terakhir yang tersimpan di perangkat
            </p>
          </div>
          {records.length > 0 && (
            <button
              type="button"
              onClick={onViewAllHistory}
              className="min-h-[40px] px-3 text-xs font-medium text-[#5B45A6] hover:text-[#4B388E] inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span>Lihat semua</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {recentRecords.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-slate-700">
              Belum ada catatan latihan
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Catat set latihan pertama Anda untuk memantau progres beban dan volume.
            </p>
            <button
              type="button"
              onClick={() => onOpenLogModal()}
              className="mt-4 min-h-[44px] px-4 py-2 rounded-lg bg-[#5B45A6] hover:bg-[#4B388E] text-white text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Catat Latihan Pertama</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                  <th className="py-2.5 px-5">Latihan</th>
                  <th className="py-2.5 px-4">Target Otot</th>
                  <th className="py-2.5 px-4 text-right">Repetisi</th>
                  <th className="py-2.5 px-4 text-right">Beban</th>
                  <th className="py-2.5 px-4 text-right">Volume</th>
                  <th className="py-2.5 px-5 text-right">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {recentRecords.map((rec) => {
                  const ex = exerciseList.find((e) => e.id === rec.exerciseId);
                  const volume = rec.reps * rec.beban;
                  return (
                    <tr
                      key={rec.id}
                      onClick={() => onSelectExercise(rec.exerciseId)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-5 font-medium text-slate-900 whitespace-nowrap">
                        {ex?.name ?? `Latihan #${rec.exerciseId}`}
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        {ex?.muscle ?? "-"}
                      </td>
                      <td className="py-3 px-4 text-right font-timer text-slate-900 whitespace-nowrap">
                        {rec.reps}
                      </td>
                      <td className="py-3 px-4 text-right font-timer text-slate-900 whitespace-nowrap">
                        {rec.beban} kg
                      </td>
                      <td className="py-3 px-4 text-right font-timer text-slate-600 whitespace-nowrap">
                        {volume.toLocaleString("id-ID")} kg
                      </td>
                      <td className="py-3 px-5 text-right font-timer text-xs text-slate-500 whitespace-nowrap">
                        {rec.tanggal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
