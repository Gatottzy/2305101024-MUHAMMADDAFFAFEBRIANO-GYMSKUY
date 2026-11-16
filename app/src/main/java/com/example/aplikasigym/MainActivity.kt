package com.example.aplikasigym

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Dashboard
import androidx.compose.material.icons.rounded.FitnessCenter
import androidx.compose.material.icons.rounded.History
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.aplikasigym.ui.theme.AplikasiGymTheme

private data class BottomTab(
    val route: String,
    val label: String,
    val icon: ImageVector
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val dao = ExerciseDatabase.getDatabase(applicationContext).exerciseDao()

        setContent {
            AplikasiGymTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    val allRecords by dao.getAllRecords().collectAsState(initial = emptyList())
                    val navBackStackEntry by navController.currentBackStackEntryAsState()
                    val currentRoute = navBackStackEntry?.destination?.route

                    val tabs = listOf(
                        BottomTab("dashboard", "Dashboard", Icons.Rounded.Dashboard),
                        BottomTab("exercises", "Latihan", Icons.Rounded.FitnessCenter),
                        BottomTab("history", "Riwayat", Icons.Rounded.History)
                    )

                    val showBottomBar = currentRoute in tabs.map { it.route }

                    val navigateToTab: (String) -> Unit = { route ->
                        navController.navigate(route) {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }

                    Scaffold(
                        bottomBar = {
                            if (showBottomBar) {
                                NavigationBar(
                                    containerColor = MaterialTheme.colorScheme.surface
                                ) {
                                    tabs.forEach { tab ->
                                        NavigationBarItem(
                                            selected = currentRoute == tab.route,
                                            onClick = { navigateToTab(tab.route) },
                                            icon = {
                                                Icon(
                                                    imageVector = tab.icon,
                                                    contentDescription = tab.label
                                                )
                                            },
                                            label = { Text(tab.label) }
                                        )
                                    }
                                }
                            }
                        }
                    ) { innerPadding ->
                        NavHost(
                            navController = navController,
                            startDestination = "dashboard",
                            modifier = Modifier.padding(innerPadding)
                        ) {
                            composable("dashboard") {
                                DashboardScreen(
                                    records = allRecords,
                                    onExerciseClick = { exerciseId ->
                                        navController.navigate("detail/$exerciseId")
                                    },
                                    onNavigateToExercises = { navigateToTab("exercises") },
                                    onNavigateToHistory = { navigateToTab("history") }
                                )
                            }
                            composable("exercises") {
                                HomeScreen(
                                    records = allRecords,
                                    onExerciseClick = { exerciseId ->
                                        navController.navigate("detail/$exerciseId")
                                    }
                                )
                            }
                            composable("history") {
                                HistoryScreen(
                                    records = allRecords,
                                    dao = dao,
                                    onExerciseClick = { exerciseId ->
                                        navController.navigate("detail/$exerciseId")
                                    },
                                    onBrowseExercises = { navigateToTab("exercises") }
                                )
                            }
                            composable(
                                route = "detail/{exerciseId}",
                                arguments = listOf(navArgument("exerciseId") { type = NavType.IntType })
                            ) { backStackEntry ->
                                val exerciseId = backStackEntry.arguments?.getInt("exerciseId") ?: 1
                                DetailScreen(
                                    exerciseId = exerciseId,
                                    dao = dao,
                                    onBackClick = { navController.popBackStack() }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
