import 'package:amazon_clone/common/widgets/bottom_bar.dart';
import 'package:amazon_clone/features/admin/screens/add_product_screen.dart';
import 'package:amazon_clone/features/admin/screens/admin_screen.dart';
import 'package:amazon_clone/features/auth/screens/auth_screen.dart';
import 'package:amazon_clone/features/home/screens/home_screen.dart';
import 'package:flutter/material.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case AuthScreen.routeName:
      return MaterialPageRoute(
          builder: (_) => const AuthScreen(), settings: routeSettings);
    case HomeScreen.routeName:
      return MaterialPageRoute(
          builder: (_) => const HomeScreen(), settings: routeSettings);
    case BottomBar.routeName:
      return MaterialPageRoute(
          builder: (_) => const BottomBar(), settings: routeSettings);
    case AdminScren.routeName:
      return MaterialPageRoute(
          builder: (_) => const AdminScren(), settings: routeSettings);
    case AddProductScreen.routeName:
      return MaterialPageRoute(
          builder: (_) => const AddProductScreen(), settings: routeSettings);
    default:
      return MaterialPageRoute(
          builder: (_) => const Scaffold(
                body: Center(
                  child: Text("Page Not Found"),
                ),
              ));
  }
}
