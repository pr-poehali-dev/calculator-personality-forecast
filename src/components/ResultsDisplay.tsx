import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TaroResult } from '@/lib/taroCalculations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ResultsDisplayProps {
  result: TaroResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Основные данные</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Дата рождения</p>
            <p className="text-xl font-semibold">{result.birthDate}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Таро-код</p>
            <p className="text-xl font-semibold">{result.taroCode}</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground mb-2">Карты Судьбы</p>
            <div className="space-y-2">
              {result.destinyCards.map((card, idx) => (
                <p key={idx} className="text-lg font-medium">{card}</p>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground mb-1">Третья карта судьбы (сильная сторона личности)</p>
            <p className="text-lg font-medium">{result.thirdDestinyCard}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Карта ресурса</p>
            <p className="text-lg font-medium">{result.resourceCard}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Карта главного жизненного урока</p>
            <p className="text-lg font-medium">{result.mainLessonCard}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Карта итога жизни</p>
            <p className="text-lg font-medium">{result.lifeResultCard}</p>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Жизненные периоды</h3>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          {result.lifePeriods.map((period) => (
            <div key={period.period} className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-semibold">Период {period.period}: {period.ageRange} лет</p>
              </div>
              <p className="font-medium">{period.card}</p>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-[hsl(var(--accent))]/20 rounded-lg text-center">
            <p className="font-semibold">Сейчас личность находится в: <span className="text-[hsl(var(--accent))]">{result.currentPeriod} жизненном периоде</span></p>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Карты кармы</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {result.karmaCards.map((card, idx) => (
            <div key={idx} className="p-4 bg-secondary/30 rounded-lg text-center">
              <p className="text-lg font-medium">{card}</p>
            </div>
          ))}
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Атмосфера судьбы</p>
            <p className="text-lg font-medium">{result.destinyAtmosphere}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Атмосфера кармы</p>
            <p className="text-lg font-medium">{result.karmaAtmosphere}</p>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Дары и препятствия</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Дары</p>
            {result.gifts.map((gift, idx) => (
              <p key={idx} className="text-lg font-medium mb-2">{gift}</p>
            ))}
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Препятствия, камни-преткновения</p>
            {result.obstacles.map((obstacle, idx) => (
              <p key={idx} className="text-lg font-medium mb-2">{obstacle}</p>
            ))}
          </div>
          
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground mb-1">Преобладание в карте личности карт</p>
            <p className="text-lg font-medium mb-2">{result.cardGender}</p>
            <p className="text-sm text-gray-600 italic">
              {result.cardGender === 'мужских' && 'Преобладание «мужских» карт говорит о том, что женщина очень автономна, независима, часто лидирует в отношениях. Могут быть проблемы в личной жизни, зато успех в карьере, бизнесе и реализации.'}
              {result.cardGender === 'женских' && 'Преобладание «женских» карт говорит о том, что мужчина может быть очень чувствительным, эмоциональным, ведомым. Могут быть проблемы в личной жизни, зато успех в творчестве.'}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Жизненные рубильники</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Положительный жизненный рубильник</p>
            <p className="text-lg font-medium">{result.positiveSwitch}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Отрицательный жизненный рубильник</p>
            <p className="text-lg font-medium">{result.negativeSwitch}</p>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Прошлая жизнь</h3>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Кем был в прошлой жизни</p>
            <p className="text-lg font-medium">{result.pastLifeWho}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Что делал в прошлой жизни, каким был</p>
            <p className="text-lg font-medium">{result.pastLifeWhat}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Какие были цели и желания в прошлой жизни</p>
            <p className="text-lg font-medium">{result.pastLifeGoals}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Что происходило в конце прошлой жизни</p>
            <p className="text-lg font-medium">{result.pastLifeEnd}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Самая главная ошибка прошлого воплощения</p>
            <p className="text-lg font-medium">{result.pastLifeMistake}</p>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Отягощения кармой</h3>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-semibold mb-1">Отягощения судьбы кармой: <span className="text-[hsl(var(--accent))]">{result.destinyBurden}</span></p>
            <p className="text-sm text-gray-600">Если есть отягощения кармой, это означает, что судьба человека отягощена дополнительными трудностями кармического характера</p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-semibold mb-1">Отягощения ресурса кармой: <span className="text-[hsl(var(--accent))]">{result.resourceBurden}</span></p>
            <p className="text-sm text-gray-600">Если ресурс отягощен кармой, то от энергии, которая отягощает, будет зависеть количество вашего ресурса</p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-semibold mb-1">Отягощения даров кармой: <span className="text-[hsl(var(--accent))]">{result.giftsBurden}</span></p>
            <p className="text-sm text-gray-600">Если дары отягощены кармой, это дает нереализованный талант, трудности в реализации собственных способностей</p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-semibold mb-1">Отягощения препятствий кармой: <span className="text-[hsl(var(--accent))]">{result.obstaclesBurden}</span></p>
            <p className="text-sm text-gray-600">Если карты-препятствия отягощены кармой, это дает страхи и фобии по той энергии, которая здесь получилась</p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="font-semibold mb-1">Отягощения жизненных периодов кармой: <span className="text-[hsl(var(--accent))]">{result.periodsBurden}</span></p>
            <p className="text-sm text-gray-600">Если есть отягощение жизненного периода кармой, это означает, что жизненный период может быть более трудный, будут дополнительные проблемы в этом периоде</p>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Портрет личности</h3>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((pos) => {
              const position = result.personalityPortrait.find(p => p.position === pos);
              return (
                <div key={pos} className="p-4 bg-secondary/30 rounded-lg text-center border-2 border-[hsl(var(--accent))]/30">
                  <div className="text-2xl font-serif font-bold text-[hsl(var(--accent))] mb-2">{pos}</div>
                  <p className="text-sm font-medium">{position?.card}</p>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">1</span> – детство, юность, первый период жизни</p>
            <p><span className="font-semibold">2</span> – взрослый период жизни, зрелый возраст</p>
            <p><span className="font-semibold">3</span> – итог жизни, конечная цель</p>
            <p><span className="font-semibold">4</span> – слабая позиция, комплексы, страхи, подсознание</p>
            <p><span className="font-semibold">5</span> – сознание, укрепляющая позиция, стремления, цели</p>
            <p><span className="font-semibold">6</span> – влияние на человека, скрытые способности, высшие покровители</p>
            <p><span className="font-semibold">7</span> – Миссия, главная задача в жизни</p>
            <p><span className="font-semibold">8</span> – Способ выполнения миссии и главной задачи</p>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Дополнительные позиции</h3>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          <div>
            <p className="font-semibold mb-1">12 позиция. Ключ к психической гармонии: <span className="text-[hsl(var(--accent))]">{result.position12}</span></p>
            <p className="text-sm text-gray-600">Дает возможность увидеть, через какие виды деятельности человек может прийти к своей гармонии</p>
          </div>
          
          <Separator />
          
          <div>
            <p className="font-semibold">13 позиция. Как человек видит себя сам: <span className="text-[hsl(var(--accent))]">{result.position13}</span></p>
          </div>
          
          <div>
            <p className="font-semibold">14 позиция. Как человека видят другие: <span className="text-[hsl(var(--accent))]">{result.position14}</span></p>
          </div>
          
          <div>
            <p className="font-semibold">36 позиция. Отношение человека к сексу и близким интимным отношениям: <span className="text-[hsl(var(--accent))]">{result.position36}</span></p>
          </div>
        </div>
      </Card>

      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="karmic" className="border-[hsl(var(--accent))] bg-white rounded-lg overflow-hidden">
          <AccordionTrigger className="px-8 py-6 hover:no-underline">
            <h3 className="text-2xl font-serif font-bold">Кармическая часть</h3>
          </AccordionTrigger>
          <AccordionContent className="px-8 pb-6">
            <div className="space-y-4">
              {result.karmicPositions.map((position) => (
                <div key={position.position} className="p-4 bg-secondary/30 rounded-lg">
                  <p className="font-semibold mb-1">{position.position} позиция: <span className="text-[hsl(var(--accent))]">{position.card}</span></p>
                  <p className="text-sm text-gray-600">{position.description}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shadow" className="border-[hsl(var(--accent))] bg-white rounded-lg overflow-hidden">
          <AccordionTrigger className="px-8 py-6 hover:no-underline">
            <h3 className="text-2xl font-serif font-bold">Теневая часть</h3>
          </AccordionTrigger>
          <AccordionContent className="px-8 pb-6">
            <div className="space-y-4 mb-8">
              <h4 className="text-xl font-serif font-semibold">Основные позиции тени</h4>
              {result.shadowPositions.map((position) => (
                <div key={position.position} className="p-4 bg-secondary/30 rounded-lg">
                  <p className="font-semibold mb-1">Позиция {position.position} ({position.positionNumber}): <span className="text-[hsl(var(--accent))]">{position.card}</span></p>
                  <p className="text-sm text-gray-600">{position.description}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-serif font-semibold">Дополнительные позиции тени</h4>
              {result.additionalShadowPositions.map((position) => (
                <div key={position.position} className="p-4 bg-secondary/30 rounded-lg">
                  <p className="font-semibold mb-1">Позиция {position.position}: <span className="text-[hsl(var(--accent))]">{position.card}</span></p>
                  <p className="text-sm text-gray-600">{position.description}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="higher" className="border-[hsl(var(--accent))] bg-white rounded-lg overflow-hidden">
          <AccordionTrigger className="px-8 py-6 hover:no-underline">
            <h3 className="text-2xl font-serif font-bold">Высший портрет</h3>
          </AccordionTrigger>
          <AccordionContent className="px-8 pb-6">
            <div className="space-y-4">
              {result.higherPortrait.map((position) => (
                <div key={position.position} className="p-4 bg-secondary/30 rounded-lg">
                  <p className="font-semibold mb-1">Позиция {position.position}: <span className="text-[hsl(var(--accent))]">{position.card}</span></p>
                  <p className="text-sm text-gray-600">{position.description}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="psychomatrix" className="border-[hsl(var(--accent))] bg-white rounded-lg overflow-hidden">
          <AccordionTrigger className="px-8 py-6 hover:no-underline">
            <h3 className="text-2xl font-serif font-bold">Психоматрица</h3>
          </AccordionTrigger>
          <AccordionContent className="px-8 pb-6">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-6 bg-[hsl(var(--accent))]/20 rounded-lg text-center">
                  <div className="text-4xl font-bold text-[hsl(var(--accent))]">{result.psychomatrix.code1.number}</div>
                </div>
                <div className="p-6 bg-[hsl(var(--accent))]/20 rounded-lg text-center">
                  <div className="text-4xl font-bold text-[hsl(var(--accent))]">{result.psychomatrix.code2.number}</div>
                </div>
                <div className="p-6 bg-[hsl(var(--accent))]/20 rounded-lg text-center">
                  <div className="text-4xl font-bold text-[hsl(var(--accent))]">{result.psychomatrix.code3.number}</div>
                </div>
                <div className="p-6 bg-[hsl(var(--accent))]/20 rounded-lg text-center">
                  <div className="text-4xl font-bold text-[hsl(var(--accent))]">{result.psychomatrix.code4.number}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="font-semibold mb-1">I число: {result.psychomatrix.code1.description}</p>
                  <p className="text-sm text-gray-600">Это кармический урок (или кармический узел), который мы получаем при рождении. Это испытание, через которое мы приходим к своей миссии.</p>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="font-semibold mb-1">II число: {result.psychomatrix.code2.description}</p>
                  <p className="text-sm text-gray-600">Миссия. Основная цель его воплощения в этой жизни. Число пути.</p>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="font-semibold mb-1">III число: {result.psychomatrix.code3.description}</p>
                  <p className="text-sm text-gray-600">Фундамент родовой системы. То, что человеку передал род. Родовая задача, урок.</p>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="font-semibold mb-1">IV число: {result.psychomatrix.code4.description}</p>
                  <p className="text-sm text-gray-600">Родовая миссия.</p>
                </div>
                
                <div className="p-4 bg-[hsl(var(--accent))]/20 rounded-lg">
                  <p className="font-semibold">Основная миссия, покровитель: {result.psychomatrix.mainMission}</p>
                </div>
                
                <div className="p-4 bg-[hsl(var(--accent))]/20 rounded-lg">
                  <p className="font-semibold">Родовая миссия, покровитель: {result.psychomatrix.ancestralMission}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="p-8 border-[hsl(var(--accent))]">
        <h3 className="text-3xl font-serif font-bold mb-6 text-center">Памятка</h3>
        
        <div className="max-w-2xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-[hsl(var(--accent))]">
                <td className="p-3 font-medium">Линия целей</td>
                <td className="p-3">1-4-7</td>
              </tr>
              <tr className="border-b border-[hsl(var(--accent))]">
                <td className="p-3 font-medium">Линия семьи и отношений</td>
                <td className="p-3">2-5-8</td>
              </tr>
              <tr className="border-b border-[hsl(var(--accent))]">
                <td className="p-3 font-medium">Линия материализации, заземления</td>
                <td className="p-3">3-6-9</td>
              </tr>
              <tr className="border-b border-[hsl(var(--accent))]">
                <td className="p-3 font-medium">Линия самооценки</td>
                <td className="p-3">1-2-3</td>
              </tr>
              <tr className="border-b border-[hsl(var(--accent))]">
                <td className="p-3 font-medium">Линия денег</td>
                <td className="p-3">4-5-6</td>
              </tr>
              <tr className="border-b border-[hsl(var(--accent))]">
                <td className="p-3 font-medium">Линия творчества</td>
                <td className="p-3">7-8-9</td>
              </tr>
              <tr className="border-b border-[hsl(var(--accent))]">
                <td className="p-3 font-medium">Линия закона</td>
                <td className="p-3">1-5-9</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Линия либидо и интимных отношений</td>
                <td className="p-3">3-5-7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
