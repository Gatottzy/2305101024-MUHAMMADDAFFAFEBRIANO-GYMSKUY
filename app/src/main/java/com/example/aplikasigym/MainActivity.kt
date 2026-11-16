package com.example.aplikasigym

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.aplikasigym.ui.theme.AplikasiGymTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            AplikasiGymTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    val navController = rememberNavController()
                    // Setup NavHost untuk navigasi 2 halaman (Home dan Detail)
                    NavHost(navController = navController, startDestination = "home") {
                        composable("home") {
                            HomeScreen(
                                onExerciseClick = { exerciseId ->
                                    navController.navigate("detail/$exerciseId")
                                }
                            )
                        }
                        composable(
                            route = "detail/{exerciseId}",
                            arguments = listOf(navArgument("exerciseId") { type = NavType.IntType })
                        ) { backStackEntry ->
                            val exerciseId = backStackEntry.arguments?.getInt("exerciseId") ?: 1
                            DetailScreen(
                                exerciseId = exerciseId,
                                onBackClick = { navController.popBackStack() }
                            )
                        }
                    }
                }
            }
        }
    }
}
