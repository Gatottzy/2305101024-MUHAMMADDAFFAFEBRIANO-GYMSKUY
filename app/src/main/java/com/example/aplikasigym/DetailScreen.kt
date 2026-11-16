package com.example.aplikasigym

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DetailScreen(exerciseId: Int, onBackClick: () -> Unit) {
    val exercise = exerciseList.find { it.id == exerciseId } ?: exerciseList.first()

    // State untuk timer istirahat 60 detik
    var timeLeft by remember { mutableStateOf(60) }
    var isRunning by remember { mutableStateOf(false) }

    // Efek untuk menghitung mundur timer per detik
    LaunchedEffect(isRunning, timeLeft) {
        if (isRunning && timeLeft > 0) {
            delay(1000L)
            timeLeft--
        } else if (timeLeft == 0) {
            isRunning = false
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(exercise.name) },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = "Kembali"
                        )
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(text = "Nama Latihan: ${exercise.name}", style = MaterialTheme.typography.headlineSmall)
            Text(text = "Target Otot: ${exercise.muscle}", style = MaterialTheme.typography.titleMedium)
            HorizontalDivider()
            Text(text = "Cara Melakukan:", style = MaterialTheme.typography.titleSmall)
            Text(text = exercise.description, style = MaterialTheme.typography.bodyLarge)

            Spacer(modifier = Modifier.height(16.dp))

            // Bagian Timer Istirahat 60 detik
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(
                    modifier = Modifier
                        .padding(16.dp)
                        .fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(text = "Timer Istirahat", style = MaterialTheme.typography.titleMedium)
                    Text(
                        text = "00:${if (timeLeft < 10) "0$timeLeft" else "$timeLeft"}",
                        style = MaterialTheme.typography.headlineMedium
                    )
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(onClick = { isRunning = !isRunning }) {
                            Text(if (isRunning) "Jeda" else "Mulai")
                        }
                        OutlinedButton(onClick = {
                            isRunning = false
                            timeLeft = 60
                        }) {
                            Text("Reset")
                        }
                    }
                }
            }
        }
    }
}
