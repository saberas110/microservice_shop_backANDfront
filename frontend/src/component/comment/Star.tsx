import { useState } from "react";
import { StarIcon as SolidStar } from '@heroicons/react/24/solid'
import { StarIcon as OutlineStar } from '@heroicons/react/24/outline'


interface IOnchange{

  onChange1? :(rating:number)=>void
}


export function StarRating({ onChange }:IOnchange) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hovered ? star <= hovered : star <= rating;

        const Icon = isFilled ? SolidStar : OutlineStar;

        return (
          <Icon
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="w-7 h-7 text-yellow-400 cursor-pointer transition "
          />
        );
      })}
    </div>
  );
}
