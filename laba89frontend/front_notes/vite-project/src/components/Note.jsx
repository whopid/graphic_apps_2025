import { Card, CardContent, Typography } from '@mui/material';

export default function Note({ 
  title = "Заметка", 
  content = "", 
  description = "",
  date = "Дата не указана"
}) {
  // Используем description, если content пустой (для обратной совместимости)
  const noteContent = content || description;
  
  return (
    <Card variant="outlined" sx={{ width: '100%', mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        
        {noteContent && (
          <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
            {noteContent}
          </Typography>
        )}
        
        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
}