import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { exerciseList } from "../data/exercises";
import type { ExerciseRecord } from "../types/exercise";

interface LogRecordModalProps {
  initialExerciseId?: number;
  onClose: () => void;
  onSave: (record: Omit<ExerciseRecord, "id">) => void;
}

export function LogRecordModal({
  initialExerciseId,
  onClose,
  onSave,
}: LogRecordModalProps) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [exerciseId, setExerciseId] = useState<number>(
    initialExerciseId ?? exerciseList[0].id
  );
  const [reps, setReps] = useState<string>("10");
  const [beban, setBeban] = useState<string>("40");
  const [tanggal, setTanggal] = useState<string>(todayStr);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsedReps = Number.parseInt(reps, 10);
    const parsedBeban = Number.parseFloat(beban);

    if (Number.isNaN(parsedReps) || parsedReps < 1) {
      setError("Jumlah repetisi minimal 1.");
      return;
    }
    if (Number.isNaN(parsedBeban) || parsedBeban < 0) {
      setError("Beban tidak boleh kurang dari 0 kg.");
      return;
    }
    if (!tanggal) {
      setError("Tanggal latihan harus diisi.");
      return;
    }

    onSave({
      exerciseId,
      reps: parsedReps,
      beban: parsedBeban,
      tanggal,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="log-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2
            id="log-modal-title"
            className="text-lg font-semibold text-slate-900"
          >
            Catat Latihan
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45A6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {error && (
            <div
              role="alert"
              className="rounded-lg bg-red-50 border border-red-200 px-3.5 py-2.5 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="modal-exercise"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Jenis Latihan
            </label>
            <select
              id="modal-exercise"
              value={exerciseId}
              onChange={(e) => setExerciseId(Number.parseInt(e.target.value, 10))}
              className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#5B45A6] focus:ring-2 focus:ring-[#5B45A6]/20"
            >
              {exerciseList.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} ({ex.muscle})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="modal-reps"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Repetisi
              </label>
              <input
                id="modal-reps"
                type="number"
                min={1}
                value={reps}
                onChange={(e) => {
                  setReps(e.target.value);
                  setError("");
                }}
                className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-timer text-sm focus:outline-none focus:border-[#5B45A6] focus:ring-2 focus:ring-[#5B45A6]/20"
              />
            </div>

            <div>
              <label
                htmlFor="modal-beban"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Beban (kg)
              </label>
              <input
                id="modal-beban"
                type="number"
                min={0}
                step="0.5"
                value={beban}
                onChange={(e) => {
                  setBeban(e.target.value);
                  setError("");
                }}
                className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-timer text-sm focus:outline-none focus:border-[#5B45A6] focus:ring-2 focus:ring-[#5B45A6]/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="modal-tanggal"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Tanggal
            </label>
            <input
              id="modal-tanggal"
              type="date"
              value={tanggal}
              onChange={(e) => {
                setTanggal(e.target.value);
                setError("");
              }}
              className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-timer text-sm focus:outline-none focus:border-[#5B45A6] focus:ring-2 focus:ring-[#5B45A6]/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2 rounded-lg bg-[#5B45A6] hover:bg-[#4B388E] text-white text-sm font-medium transition-colors"
            >
              Simpan Catatan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
