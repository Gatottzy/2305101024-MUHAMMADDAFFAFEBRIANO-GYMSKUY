package com.example.aplikasigym

// Data class untuk merepresentasikan informasi latihan gym
data class Exercise(
    val id: Int,
    val name: String,
    val muscle: String,
    val description: String
)

// Daftar latihan offline
val exerciseList = listOf(
    Exercise(1, "Bench Press", "Dada", "Berbaring di bench, pegang barbell selebar bahu, turunkan ke dada lalu dorong ke atas."),
    Exercise(2, "Squat", "Kaki / Paha", "Berdiri dengan kaki selebar bahu, turunkan pinggul seperti duduk, lalu kembali berdiri tegak."),
    Exercise(3, "Deadlift", "Punggung / Paha Belakang", "Pegang barbell di lantai, angkat beban dengan menjaga punggung tetap lurus dan dorong pinggul ke depan."),
    Exercise(4, "Pull Up", "Punggung / Biceps", "Gantung pada pull-up bar, tarik tubuh ke atas hingga dagu melewati bar, lalu turunkan perlahan."),
    Exercise(5, "Shoulder Press", "Bahu", "Pegang dumbbells di atas bahu, dorong ke atas hingga lengan lurus, lalu turunkan kembali.")
)
