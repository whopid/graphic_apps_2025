import { useEffect, useState } from "react";
import {
  Box,
  Container,
  CircularProgress,
  Alert,
  List,
  ListItem,
  Typography
} from "@mui/material";
import { fetchNotes } from "./services/notes";
import CreateNoteForm from "./components/CreateNoteForm";
import Filters from "./components/Filters";
import Note from './components/Note';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    sort_item: 'created_at',
    sort_order: 'desc'
  });

  // Загрузка заметок с учетом фильтров
  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotes(filters);
      setNotes(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Обновление фильтров
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Перезагрузка при изменении фильтров
  useEffect(() => {
    loadNotes();
  }, [filters]);

  // Создание новой заметки
  const handleNoteCreated = (newNote) => {
    setNotes(prev => [newNote, ...prev]);
  };

  if (loading && !notes.length) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {/* Левая колонка - форма и фильтры */}
        <Box width={{ xs: "100%", md: "30%" }}>
          <CreateNoteForm onNoteCreated={handleNoteCreated} />
          
          <Box mt={4}>
            <Filters 
              search={filters.search}
              sortItem={filters.sort_item}
              sortOrder={filters.sort_order}
              onFilterChange={handleFilterChange}
            />
          </Box>
        </Box>

        {/* Правая колонка - список заметок */}
        <Box flexGrow={1}>
          <Typography variant="h5" gutterBottom>
            {filters.search ? `Результаты поиска: "${filters.search}"` : 'Все заметки'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {notes.length === 0 ? (
            <Alert severity="info">
              {filters.search ? 'Ничего не найдено' : 'Заметок пока нет'}
            </Alert>
          ) : (
            <List>
              {notes.map((note) => (
                <ListItem key={note.id} disablePadding sx={{ mb: 2 }}>
                  <Note 
                    title={note.title}
                    content={note.description}
                    date={new Date(note.created_at).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;