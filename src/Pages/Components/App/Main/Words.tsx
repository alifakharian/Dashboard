import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { useWordcontext } from "../../Context/words";
import { useLancontext } from "../../Context/Language";

const SortableWordItem = ({ id }: { id: string }) => {
  const { keywords, handleEditTranslation, handleDeleteWord } =
    useWordcontext();
  const { currentLanguage } = useLancontext();

  const item = keywords.find((elem) => elem.id === id);
  if (!item) return null;

  const langKey = currentLanguage as keyof typeof item.translations;
  const value = item.translations[langKey];

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 mx-auto  shadow-[0_0_15px_5px] shadow-pink-500 dark:shadow-[0_0_15px_5px] dark:shadow-gray-200 px-3 btn-delay w-full  smd:w-[50%] font-bold rounded-lg dark:border-white m-4 bg-pink-200 dark:bg-gray-800"
    >
      <div className="flex flex-row-reverse justify-between items-center gap-4">
        <input
          value={value}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={(e) => handleEditTranslation(id, langKey, e.target.value)}
          className="text-red-600 smd:w-[65%] sm:w-[30%] bg-white text-center dark:text-white outline-none dark:bg-gray-700 p-1 rounded"
        />

        <div className="flex justify-center gap-x-3 mt-2">
          <div
            className={+id > 4 ? "text-red-500 pt-1 dark:text-blue-500" : ""}
          >
            <div className="text-rose-800 dark:text-white btn-delay">
              {item.word}
            </div>
          </div>

          {!["1", "2", "3", "4"].includes(id) && (
            <button
              onClick={() => handleDeleteWord(id)}
              onPointerDown={(e) => e.stopPropagation()}
              className="btn-button"
            >
              حذف
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function Words() {
  const { keywords, setKeywords } = useWordcontext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = parseInt(active.id.toString());
    const overId = parseInt(over.id.toString());

    if (activeId !== overId) {
      const oldIndex = keywords.findIndex((item) => +item.id === activeId);
      const newIndex = keywords.findIndex((item) => +item.id === overId);
      const newOrder = arrayMove(keywords, oldIndex, newIndex);
      setKeywords(newOrder);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={keywords.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <>
          {keywords.map((elem) => (
            <SortableWordItem key={elem.id} id={elem.id} />
          ))}
        </>
      </SortableContext>
    </DndContext>
  );
}

export default Words;
