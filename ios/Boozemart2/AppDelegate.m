#import "AppDelegate.h"
 #import <Firebase.h>
 #import <FirebaseFirestore/FirebaseFirestore.h>
 #import <FirebaseAuth/FirebaseAuth.h>
#import <FirebaseCore/FirebaseCore.h>
#import <GoogleMaps/GoogleMaps.h> 
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Boozemart2"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [GMSServices provideAPIKey:@"AIzaSyD9S5rAJ1RNWrG3fHjDKU8m2khTUxcr5u8"];
//   [FIRApp configure];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
// #else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
}

@end
