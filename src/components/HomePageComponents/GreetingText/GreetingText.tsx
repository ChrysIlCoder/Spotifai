import './GreetingText.scss'

function getTimeOfDay() {
  const currentHour = new Date().getHours();
  let greeting;

  switch (true) {
    case currentHour < 12:
      greeting = 'morning';
      break;
    case currentHour < 18:
      greeting = 'afternoon';
      break;
    case currentHour < 21:
      greeting = 'evening';
      break;
    default:
      greeting = 'night';
      break;
  }

  return greeting;
}

export default function GreetingText() {
  const greeting = getTimeOfDay();

  return <h1 className="greeting_container">Good {greeting}</h1>
}
