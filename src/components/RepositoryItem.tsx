interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
    html_url: string;
  };
}

export function RepositoryItem(props: RepositoryItemProps) {
  return (
    <div className="repository-item">
      <a href={props.repository.html_url}>
        <strong>{props.repository.name}</strong>
        <p>{props.repository.description}</p>
      </a>
    </div>
  );
}
