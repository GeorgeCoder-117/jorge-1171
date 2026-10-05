interface ConfirmBtnProps {
  name: string;
  loading: boolean;
}


export const ConfirmButton = ({ name, loading }: ConfirmBtnProps) => {
  return (
    <button className="btn btn-success" type="submit">
      {loading ? 'Cargando...' : name}
    </button>
  );
}