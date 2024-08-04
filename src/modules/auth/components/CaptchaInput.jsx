import { Input } from '@/src/core/components/ui/input.jsx';
import { useEffect, useState } from 'react';
import captchaService from '@/src/modules/auth/services/captchaService.js';

export default function CaptchaInput({ onChange }) {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(true);

  function parseQuestion(captchaObj) {
    const { firstInput, secondInput, operator } = captchaObj;
    const question = `${firstInput} ${operator} ${secondInput} = ?`;
    setQuestion(question);
  }

  const fetchCaptchaData = async () => {
    const captchaObject = captchaService.genCaptcha();
    setAnswer(captchaObject.result);
    parseQuestion(captchaObject);
    return captchaObject;
  };

  function handleChange(e) {
    const inputValue = Number(e.target.value);
    if (!isNaN(inputValue) && answer !== null && inputValue === answer) {
      setIsCorrect(true);
      onChange && onChange(true);
    } else {
      setIsCorrect(false);
      onChange && onChange(false);
    }
  }

  useEffect(() => {
    fetchCaptchaData();
  }, []);

  return (
    <section className="w-full flex flex-col gap-y-2">
      <div className="flex rounded-md items-center ">
        <div className="text-nowrap h-full bg-input px-3 py-2 rounded-md rounded-r-none">
          {question ?? ''}
        </div>
        <Input
          onInput={handleChange}
          className="border-l-0 rounded-l-none focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0"
          placeholder="Input answer"
        />
      </div>
      <div className="text-destructive text-left">
        {!isCorrect && <p>Incorrect answer. Please try again.</p>}
      </div>
    </section>
  );
}
