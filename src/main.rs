#![windows_subsystem="windows"]
#[macro_use] extern crate sciter;

struct EventHandler {}
impl EventHandler {}
impl sciter::EventHandler for EventHandler {}

fn main() {
    sciter::set_options(sciter::RuntimeOptions::DebugMode(false)).unwrap();
    let archived = include_bytes!("../target/assets.rc");
    let mut frame = sciter::Window::new();
    frame.event_handler(EventHandler { });
    frame.archive_handler(archived).unwrap();
    frame.load_file("this://app/main.html");
    frame.run_app();
}

