import { Phone } from 'lucide-react';
import { HELPLINES } from '@/lib/mental-health-utils';

const HelplineButton = () => {
  const handleClick = () => {
    const message = `🆘 Emergency Mental Health Helplines:\n\n${HELPLINES.map(h => `${h.name}\n📞 ${h.number}\n${h.description}`).join('\n\n')}`;
    alert(message);
  };

  return (
    <button
      onClick={handleClick}
      className="fab-helpline"
      title="Emergency Helplines"
    >
      <Phone className="w-6 h-6" />
    </button>
  );
};

export default HelplineButton;