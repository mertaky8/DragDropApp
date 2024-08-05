import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { nanoid } from "nanoid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

const TextField = styled.input`
  flex: 1;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  overflow: hidden;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: white;
  width: 100%;
  margin-bottom: "12px";
`;

const List = styled.div`
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  margin: 2;
  align-items: center;
`;

const ListBox = styled.div`
  width: %100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 8px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &.edit {
      background-color: #ffc107;
      color: white;

      &:hover {
        background-color: #e0a800;
      }
    }

    &.delete {
      background-color: #dc3545;
      color: white;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
`;

const FormPage = () => {
  interface ItemsProps {
    id: string;
    content: string;
  }
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [itemContent, setItemContent] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [inputEdit, setInputEdit] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const itemsContent = [...items];
    const [removedItem] = itemsContent.splice(result.source.index, 1);
    itemsContent.splice(result.destination.index, 0, removedItem);

    setItems(itemsContent);
  };

  const addItem = () => {
    if (!itemContent.trim()) {
      alert("Boş karakter girişi yapıldı. Düzgün bir ekleme yapmayı deneyin.");
      return;
    }
    const nanoId = nanoid();
    const newList = {
      id: nanoId,
      content: itemContent,
    };
    setItems([...items, newList]);
    setItemContent("");
  };

  const deleteItem = (id: string) => {
    setItems((items) => {
      return items.filter((item) => item.id !== id);
    });
  };

  const openEditModal = (id: string, content: string) => {
    setOpen(true);
    setInputEdit(content);
    setSelectedId(id);
    console.log(content, id);
  };

  const savedEditedItem = () => {
    const selectedItem = items.find((item) => item.id === selectedId);
    if (selectedItem) {
      selectedItem.content = inputEdit;
      setItems([...items]);
    }
    setOpen(false);
  };

  const closedEditedModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Container>
        <InputContainer>
          <TextField
            type="text"
            value={itemContent}
            onChange={(e) => {
              setItemContent(e.target.value);
            }}
            placeholder="Yeni bir madde ekleyin."
          />
          <Button onClick={addItem}>Ekle</Button>
        </InputContainer>
        <ListContainer>
          <List>
            <h2>To-Do List</h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="otherPeople">
                {(provider: any) => (
                  <div {...provider.droppableProps} ref={provider.innerRef}>
                    {items.map(({ id, content }: ItemsProps, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provider: any) => (
                          <ListBox
                            ref={provider.innerRef}
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                          >
                            {content}
                            <EditDeleteContainer>
                              <Button
                                onClick={() => openEditModal(id, content)}
                              >
                                <FaEdit />
                              </Button>
                              <Button onClick={() => deleteItem(id)}>
                                <FaTrash />
                              </Button>
                            </EditDeleteContainer>
                          </ListBox>
                        )}
                      </Draggable>
                    ))}
                    {provider.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </List>
        </ListContainer>
      </Container>

      {open && (
        <Modal onClick={() => closedEditedModal()}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <TextField
              type="text"
              value={inputEdit}
              onChange={(e) => setInputEdit(e.target.value)}
            />
            <Button onClick={savedEditedItem}>Save</Button>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};

export default FormPage;
