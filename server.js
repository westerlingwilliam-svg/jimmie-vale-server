const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const supabase = createClient(
  'https://tylrdfuuhvqghqgcjwhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bHJkZnV1aHZxZ2hxZ2Nqd2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0ODcyNjIsImV4cCI6MjEwMDA2MzI2Mn0.Og4zqZ1BT4j4AGkH2puAEFojsXIkzHuz659Hq0vtWjM'
);

app.post('/save', async (req, res) => {
  const { user_id, data } = req.body;
  if(!user_id || !data) return res.status(400).json({ error: 'Missing data' });
  const { error } = await supabase.from('saves').upsert({ user_id, data, updated_at: new Date() });
  if(error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

app.get('/load/:user_id', async (req, res) => {
  const { data, error } = await supabase.from('saves').select('data').eq('user_id', req.params.user_id).single();
  if(error) return res.status(404).json({ error: 'No save found' });
  res.json({ data: data.data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server kör på port ${PORT}`));