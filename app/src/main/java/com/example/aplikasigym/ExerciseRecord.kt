package com.example.aplikasigym

import androidx.room.Entity
import androidx.room.PrimaryKey

// Entity Room untuk tabel catatan latihan
@Entity(tableName = "exercise_records")
data class ExerciseRecord(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0L,
    val exerciseId: Int,
    val reps: Int,
    val beban: Float, // Berat dalam kg
    val tanggal: String // Tanggal catatan latihan
)
