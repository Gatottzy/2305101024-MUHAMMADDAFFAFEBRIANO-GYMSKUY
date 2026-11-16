package com.example.aplikasigym

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class ExerciseUnitTest {
    @Test
    fun exerciseList_containsFiveExercises() {
        assertEquals(5, exerciseList.size)
        assertTrue(exerciseList.any { it.name == "Bench Press" })
    }

    @Test
    fun formatKg_formatsWholeAndDecimalNumbers() {
        assertEquals("40", formatKg(40.0f))
        assertEquals("42.5", formatKg(42.5f))
    }
}
