import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { exerciseList } from "../data/exercises";
import type { ExerciseRecord } from "../types/exercise";

interface HistoryScreenProps {
  records: ExerciseRecord[];
  onSelectExercise: (exerciseId: number) => void;
  onOpenLogModal: () => void;
  onDeleteRecord: (recordId: number) => void;
}

export function HistoryScreen({
  records,
  onSelectExercise,
  onOpenLogModal,
  onDeleteRecord,
}: HistoryScreenProps) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("all");

  const filteredRecords =
    selectedExerciseId === "all"
      ? records
      : records.filter(
          (r) => r.exerciseId === Number.parseInt(selectedExerciseId, 10)
        );

  const totalVolume = filteredRecords.reduce(
    (sum, r) => sum + r.reps * r.beban,
    0
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label
            htmlFor="history-filter"
            className="text-sm font-medium text-slate-700 whitespace-nowrap"
          >
            Filter Latihan:
          </label>
          <select
            id="history-filter"
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
            className="min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#5B45A6] focus:ring-2 focus:ring-[#5B45A6]/20"
          >
            <option value="all">Semua Gerakan ({records.length})</option>
            {exerciseList.map((ex) => (
              <option key={ex.id} value={String(ex.id)}>
                {ex.name}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-slate-600 tabular-nums">
          Total Volume:{" "}
          <span className="font-timer font-semibold text-slate-900">
            {totalVolume.toLocaleString("id-ID")} kg
          </span>
        </p>
      </div>

      <section className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {filteredRecords.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-base font-medium text-slate-700">
              Tidak ada catatan latihan
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Mulai catat set latihan Anda untuk membangun riwayat latihan.
            </p>
            <button
              type="button"
              onClick={onOpenLogModal}
              className="mt-4 min-h-[44px] px-4 py-2 rounded-lg bg-[#5B45A6] hover:bg-[#4B388E] text-white text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Catat Latihan</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                  <th className="py-3 px-5">Tanggal</th>
                  <th className="py-3 px-4">Latihan</th>
                  <th className="py-3 px-4">Target Otot</th>
                  <th className="py-3 px-4 text-right">Repetisi</th>
                  <th className="py-3 px-4 text-right">Beban</th>
                  <th className="py-3 px-4 text-right">Volume</th>
                  <th className="py-3 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredRecords.map((rec) => {
                  const ex = exerciseList.find((e) => e.id === rec.exerciseId);
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-5 font-timer text-xs text-slate-600 whitespace-nowrap">
                        {rec.tanggal}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onSelectExercise(rec.exerciseId)}
                          className="font-medium text-slate-900 hover:text-[#5B45A6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45A6] rounded"
                        >
                          {ex?.name ?? `Latihan #${rec.exerciseId}`}
                        </button>
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
                        {(rec.reps * rec.beban).toLocaleString("id-ID")} kg
                      </td>
                      <td className="py-2 px-5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onDeleteRecord(rec.id)}
                          aria-label={`Hapus catatan ${ex?.name ?? ""} tanggal ${rec.tanggal}`}
                          className="min-h-[38px] min-w-[38px] inline-flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
