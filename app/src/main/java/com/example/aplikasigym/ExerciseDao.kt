package com.example.aplikasigym

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

// DAO untuk mengakses database catatan latihan
@Dao
interface ExerciseDao {
    @Insert
    suspend fun insertRecord(record: ExerciseRecord)

    @Query("SELECT * FROM exercise_records WHERE exerciseId = :exerciseId ORDER BY id DESC")
    fun getRecordsForExercise(exerciseId: Int): Flow<List<ExerciseRecord>>
}
