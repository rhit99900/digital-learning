"use client";

import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { Spinner } from "./ui/spinner";

type ItemLoadingProps = {
  steps: string[];
}

const ItemLoading = ({steps}: ItemLoadingProps) => {
  return (
    <div className="flex w-full flex-col gap-4 [--radius:1rem]">
      <Item variant="muted" className="w-full overflow-auto">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Generating Lesson</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          {steps.length ? (
            <div>
              <strong className="text-sm">Steps:</strong>              
              {steps.map((s, i) => (
                <p className="text-sm mb-[2px] w-full overflow-clip" key={i}>{s}</p>
              ))}              
            </div>
          ): null}
        </ItemContent>
      </Item>
    </div>
  )
}

export default ItemLoading;