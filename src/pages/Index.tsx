import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { calculateTaroCode, TaroResult } from '@/lib/taroCalculations';
import ResultsDisplay from '@/components/ResultsDisplay';

const Index = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState<TaroResult | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCalculate = () => {
    if (!day || !month || !year) return;
    
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const calculatedResult = calculateTaroCode(birthDate);
    setResult(calculatedResult);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[hsl(var(--border))] py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-black">Таро Калькулятор</h1>
        
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-white">
            <nav className="flex flex-col gap-4 mt-8">
              <a href="#" className="text-lg font-serif hover:text-[hsl(var(--accent))] transition-colors">
                Главная
              </a>
              <a href="#channels" className="text-lg font-serif hover:text-[hsl(var(--accent))] transition-colors">
                Каналы судьбы
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className="container max-w-6xl mx-auto px-6 py-12">
        <Card className="p-8 mb-12 border-[hsl(var(--accent))] shadow-sm animate-fade-in">
          <h2 className="text-4xl font-serif font-bold text-center mb-8">Расчет Таро-кода</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div>
              <Label htmlFor="day" className="text-base mb-2 block">День рождения</Label>
              <Input
                id="day"
                type="number"
                placeholder="01"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="text-lg"
              />
            </div>
            
            <div>
              <Label htmlFor="month" className="text-base mb-2 block">Месяц рождения</Label>
              <Input
                id="month"
                type="number"
                placeholder="01"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="text-lg"
              />
            </div>
            
            <div>
              <Label htmlFor="year" className="text-base mb-2 block">Год рождения</Label>
              <Input
                id="year"
                type="number"
                placeholder="1990"
                min="1900"
                max="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="text-lg"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleCalculate}
              size="lg"
              className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-black font-semibold px-12 text-lg"
            >
              Рассчитать
            </Button>
          </div>
        </Card>

        {result && <ResultsDisplay result={result} />}
      </main>

      <footer className="border-t border-[hsl(var(--border))] py-6 text-center text-sm text-muted-foreground">
        <p>© 2024 Таро Калькулятор. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Index;
