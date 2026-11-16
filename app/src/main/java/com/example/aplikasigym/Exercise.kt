package com.example.aplikasigym

// Data class untuk merepresentasikan informasi latihan gym
data class Exercise(
    val id: Int,
    val name: String,
    val muscle: String,
    val muscleGroup: String,
    val targetGuide: String,
    val description: String
)

// Daftar latihan offline
val exerciseList = listOf(
    Exercise(
        id = 1,
        name = "Bench Press",
        muscle = "Dada",
        muscleGroup = "Dada",
        targetGuide = "3-4 Set • 8-12 Reps",
        description = "Berbaring di bench, pegang barbell selebar bahu, turunkan ke dada lalu dorong ke atas dengan kontrol penuh."
    ),
    Exercise(
        id = 2,
        name = "Squat",
        muscle = "Kaki / Paha",
        muscleGroup = "Kaki",
        targetGuide = "4 Set • 8-10 Reps",
        description = "Berdiri dengan kaki selebar bahu, turunkan pinggul seperti duduk sambil menjaga punggung netral, lalu dorong kembali berdiri tegak."
    ),
    Exercise(
        id = 3,
        name = "Deadlift",
        muscle = "Punggung / Paha Belakang",
        muscleGroup = "Punggung",
        targetGuide = "3 Set • 5-8 Reps",
        description = "Pegang barbell di lantai selebar bahu, angkat beban dengan menjaga punggung tetap lurus dan dorong pinggul ke depan saat berdiri."
    ),
    Exercise(
        id = 4,
        name = "Pull Up",
        muscle = "Punggung / Biceps",
        muscleGroup = "Punggung",
        targetGuide = "3 Set • 6-12 Reps",
        description = "Gantung pada pull-up bar dengan genggaman lebih lebar dari bahu, tarik tubuh ke atas hingga dagu melewati bar, lalu turunkan perlahan."
    ),
    Exercise(
        id = 5,
        name = "Shoulder Press",
        muscle = "Bahu",
        muscleGroup = "Bahu",
        targetGuide = "3-4 Set • 10-12 Reps",
        description = "Pegang dumbbells setinggi bahu dengan siku sedikit ke depan, dorong ke atas hingga lengan hampir lurus, lalu turunkan kembali perlahan."
    )
)
