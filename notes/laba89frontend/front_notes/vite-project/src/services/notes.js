import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Получает заметки с возможностью фильтрации и сортировки
 * @param {Object} params - Параметры запроса
 * @param {string} [params.search] - Поисковая строка
 * @param {string} [params.sort_item] - Поле для сортировки
 * @param {string} [params.sort_order] - Порядок сортировки (asc/desc)
 */
export const fetchNotes = async ({ search, sort_item, sort_order } = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes/`, {
      params: {
        search: search || undefined,
        sort_item: sort_item || undefined,
        sort_order: sort_order || undefined
      }
    });
    
    // Обрабатываем разные форматы ответа
    return Array.isArray(response.data) ? response.data : response.data?.notes || [];
  } catch (error) {
    console.error("Ошибка при загрузке заметок:", {
      config: error.config,
      response: error.response?.data
    });
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notes/`, noteData);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании заметки:", error.response?.data);
    throw error;
  }
};