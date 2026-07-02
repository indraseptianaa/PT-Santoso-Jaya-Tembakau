  // Default product pages state (load from localStorage)
  const [defaultPages, setDefaultPages] = React.useState({
    rokok: { 
      title: 'Rokok Products', 
      description: '', 
      status: 'published' as 'published' | 'draft', 
      pageViews: 0,
      filterCategories: [] as any[]
    },
    tsc: { 
      title: 'Tembakau TSC', 
      description: '', 
      status: 'published' as 'published' | 'draft', 
      pageViews: 0,
      filterCategories: [] as any[]
    },
    tsg: { 
      title: 'Tembakau TSG', 
      description: '', 
      status: 'published' as 'published' | 'draft', 
      pageViews: 0,
      filterCategories: [] as any[]
    }
  });
